import { ActivityType, ScenarioResult } from '@prisma/client';
import { Formik } from 'formik';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { SWRConfig } from 'swr';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Panel from '@/components/Panel';
import Select from '@/components/Select';
import Text from '@/components/Text';
import db from '@/db';
import useScenario from '@/hooks/useScenario';
import http, { Routes } from '@/lib/http';
import { sessionOptions } from '@/lib/session/config';
import { Option } from '@/types/form';
import { Scenario, ScenarioUpdateData } from '@/types/scenario';
import { currentTime } from '@/utils/date';
import { titleize } from '@/utils/string';

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const { user } = req.session;
  const { id } = query;

  // Need to check if user is logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const scenario = await db.scenario.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      campaign: true,
      location: true,
    },
  });

  return {
    props: {
      fallback: {
        [`/scenarios/${id}`]: scenario,
      },
      scenario,
    },
  };
}, sessionOptions);

const formState = { result: { value: '', label: '' } };

type FormState = {
  result: Option<ScenarioResult>;
};

const resultOptions = Object.keys(ScenarioResult).map((key) => ({
  label: titleize(key),
  value: key as ScenarioResult,
}));

type Props = {
  scenario: Scenario;
  fallback: {
    [k: string]: Scenario;
  };
};

const ScenarioShow: NextPage<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { scenario, setScenario } = useScenario(id as string);

  const handleSubmitForm = async (values: FormState) => {
    const scenarioData: ScenarioUpdateData = {
      completedAt: currentTime(),
      result: values.result.value,
    };

    const activityData = {
      campaignId: scenario.campaignId,
      type: ActivityType.ScenarioCompleted,
      data: {
        locationName: scenario.location.name,
        locationTag: scenario.location.tag,
        result: values.result.value,
      },
    };

    const scenarioRequest = setScenario(
      http
        .patch('/scenarios/' + scenario.id, {
          scenario: scenarioData,
        })
        .then((res) => res.data.scenario)
    );

    const activityRequest = http.post(Routes.Activities, {
      activity: activityData,
    });

    await Promise.all([scenarioRequest, activityRequest]);

    setIsModalVisible(false);
  };

  return (
    <>
      <Text as="h1" appearance="header" className="mb-4">
        <Link href={`/campaigns/${scenario.campaignId}`}>
          <a className="underline">{scenario.campaign.name}</a>
        </Link>

        {' > ' + scenario.location.name}
      </Text>

      <Panel>
        <Text as="h2" appearance="subheader" className="mb-4">
          Scenario Status
        </Text>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="p-3">
                <Text appearance="body">Current Location:</Text>
              </td>
              <td className="p-3">
                <StatusText scenario={scenario} />
              </td>
              <td className="p-3 text-right">
                <Button
                  className="w-full"
                  disabled={!!scenario.completedAt}
                  onClick={() => setIsModalVisible(true)}
                >
                  Complete Scenario
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>

      {isModalVisible && (
        <Formik
          initialValues={formState as FormState}
          onSubmit={handleSubmitForm}
        >
          {({
            dirty,
            errors,
            handleBlur,
            isSubmitting,
            isValid,
            setFieldValue,
            submitForm,
            values,
          }) => (
            <Modal onDismiss={() => setIsModalVisible(false)}>
              <Text as="h1" appearance="header" className="mb-4">
                Complete Scenario
              </Text>

              <Modal.Body>
                <Select
                  error={errors.result?.value}
                  getOptionLabel={(option) => (option as Option).label}
                  getOptionValue={(option) =>
                    (option as Option).value.toString()
                  }
                  onBlur={handleBlur}
                  onChange={(value) => setFieldValue('result', value)}
                  options={resultOptions}
                  name="result"
                  value={values.result}
                ></Select>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  appearance="secondary"
                  onClick={() => setIsModalVisible(false)}
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  appearance="primary"
                  className="ml-4"
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={submitForm}
                  type="submit"
                >
                  Complete Scenario
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Formik>
      )}
    </>
  );
};

function StatusText({ scenario }: Pick<Props, 'scenario'>): ReactElement {
  if (!scenario.completedAt) {
    return <Text appearance="body">Not Started</Text>;
  }

  if (scenario.result === ScenarioResult.Success) {
    return <span className="text-lime-400 text-xl">Success</span>;
  }

  return <span className="text-rose-500 text-xl">Failed</span>;
}

const Wrapper: NextPage<Props> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <ScenarioShow {...props} />
    </SWRConfig>
  );
};

export default Wrapper;
