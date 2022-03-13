import { Campaign } from '@prisma/client';
import { Formik } from 'formik';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';
import { useState } from 'react';

import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import db from '@/db';
import http, { Routes } from '@/lib/http';
import { sessionOptions } from '@/lib/session/config';
import CampaignSchema from '@/schemas/campaign';

// TODO: MAke reusable util for this
export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { user } = req.session;

  // Need to check if user is logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const userCampaigns = await db.usersOnCampaigns.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    include: {
      campaign: true,
    },
  });

  const campaigns = userCampaigns.map((userCampaign) => userCampaign.campaign);

  return {
    props: {
      campaigns,
      user: req.session.user,
    },
  };
}, sessionOptions);

type Props = {
  campaigns: Campaign[];
};

const initialValues = {
  name: '',
};

type FormState = typeof initialValues;

const Campaigns: NextPage<Props> = ({ campaigns }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (campaign: FormState) => {
    try {
      const response = await http.post(Routes.Campaigns, { campaign });

      setIsVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button appearance="primary" onClick={() => setIsVisible(true)}>
        Create Campaign
      </Button>

      {!campaigns.length && <EmptyState text="You don't have any campaigns" />}

      <pre>{JSON.stringify(campaigns, null, 2)}</pre>

      {isVisible && (
        <Modal onDismiss={() => setIsVisible(false)}>
          <Text as="h1" appearance="header" className="mb-4">
            Create Campaign
          </Text>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={CampaignSchema}
          >
            {({
              dirty,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              isValid,
              submitForm,
              touched,
              values,
            }) => (
              <>
                <Modal.Body>
                  <Input
                    className="mb-6"
                    error={errors.name}
                    isTouched={touched.name}
                    label="Party Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                  />
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    appearance="primary"
                    disabled={isSubmitting || !isValid || !dirty}
                    onClick={submitForm}
                    type="submit"
                  >
                    Create Campaign
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default Campaigns;
