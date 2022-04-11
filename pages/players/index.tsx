import { ActivityType, ScenarioResult } from '@prisma/client';
import { Formik } from 'formik';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Panel from '@/components/Panel';
import Select from '@/components/Select';
import Text from '@/components/Text';
import useModal from '@/hooks/useModal';
import { authenticate } from '@/lib/auth/authenticate';
import http, { Routes } from '@/lib/http';
import { toPageProps } from '@/lib/pages/error';
import { sessionOptions } from '@/lib/session/config';
import InvitationSchema from '@/schemas/invitation';
import * as ConnectionsService from '@/services/connections';
import * as InvitationsService from '@/services/invitations';
import { Connection } from '@/types/connection';
import { Option } from '@/types/form';
import { Invitation } from '@/types/invitation';
import { Scenario, ScenarioUpdateData } from '@/types/scenario';
import { currentTime, formatDate } from '@/utils/date';
import { titleize } from '@/utils/string';

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  try {
    const user = authenticate(req);

    const { connections } = await ConnectionsService.list({
      user,
    });

    const { receivedInvitations, sentInvitations } =
      await InvitationsService.list({
        user,
      });

    return {
      props: {
        connections,
        receivedInvitations,
        sentInvitations,
      },
    };
  } catch (err) {
    return toPageProps(err);
  }
}, sessionOptions);

const formState = {
  email: '',
};

type FormState = typeof formState;

type Props = {
  connections: Connection[];
  receivedInvitations: Invitation[];
  sentInvitations: Invitation[];
};

const Players: NextPage<Props> = ({
  connections,
  receivedInvitations,
  sentInvitations,
}) => {
  const router = useRouter();
  const invitationModal = useModal();

  const handleSubmitForm = async (invitation: FormState) => {
    try {
      await http.post(Routes.Invitations, { invitation });
      invitationModal.close();
      router.replace(router.asPath);
    } catch (err) {
      // TODO: Handle error
    }
  };

  return (
    <>
      <Text as="h1" appearance="header" className="mb-4">
        Players
      </Text>

      <Panel className="mb-4">
        <Text as="h2" appearance="subheader" className="mb-4">
          Invitations
        </Text>

        <Button className="mb-4" onClick={invitationModal.open}>
          Connect Player
        </Button>

        <table className="w-full text-slate-300 text-left">
          <thead>
            <tr className="border-b-2 border-slate-300 border-solid">
              <th className="py-2">Player</th>
              <th className="py-2">Date</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {receivedInvitations.map((invitation) => (
              <tr
                key={invitation.id}
                className="border-b border-slate-300 border-solid"
              >
                <td className="py-2">{invitation.from.email}</td>
                <td className="py-2">{formatDate(invitation.createdAt)}</td>
                <td className="py-2 text-right">
                  <div>
                    <Button className="mr-2">Accept</Button>
                    <Button appearance="destructive">Decline</Button>
                  </div>
                </td>
              </tr>
            ))}

            {sentInvitations.map((invitation) => (
              <tr key={invitation.id}>
                <td>{invitation.to.email}</td>
                <td>{formatDate(invitation.createdAt)}</td>
                <td>Awaiting Reply</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel>
        <Text as="h2" appearance="subheader" className="mb-4">
          Connections
        </Text>
      </Panel>

      {invitationModal.isOpen && (
        <Formik
          initialValues={formState}
          onSubmit={handleSubmitForm}
          validationSchema={InvitationSchema}
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
            <Modal onDismiss={invitationModal.close}>
              <Text as="h1" appearance="header" className="mb-4">
                Invite Player
              </Text>

              <Modal.Body>
                <Input
                  className="mb-5"
                  error={errors.email}
                  isTouched={touched.email}
                  label="User Email Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  value={values.email}
                />
              </Modal.Body>

              <Modal.Footer>
                <Button
                  appearance="secondary"
                  onClick={invitationModal.close}
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
                  Send Invite
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Formik>
      )}
    </>
  );
};

export default Players;
