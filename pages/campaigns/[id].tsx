import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next/types';

import Button from '@/components/Button';
import Panel from '@/components/Panel';
import Text from '@/components/Text';
import db from '@/db';
import { sessionOptions } from '@/lib/session/config';
import { CampaignWithRelations } from '@/types/campaign';

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

  const campaign = await db.campaign.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      location: true,
    },
  });

  // TODO: Make sure you can view the campaign

  if (!campaign) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      campaign,
      user: req.session.user,
    },
  };
}, sessionOptions);

type Props = {
  campaign: CampaignWithRelations;
};

const CampaignShow: NextPage<Props> = ({ campaign }) => {
  return (
    <>
      <Text as="h1" appearance="header" className="mb-4">
        {campaign.name}
      </Text>

      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-3">
          <Panel>
            <Text as="h2" appearance="subheader" className="mb-4">
              Current Status
            </Text>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-3">
                    <Text appearance="body">Current Location:</Text>
                  </td>
                  <td className="p-3">
                    <Text appearance="body">{campaign.location.name}</Text>
                  </td>
                  <td className="p-3 text-right">
                    <Button className="w-full">Travel</Button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">
                    <Text appearance="body">Event Status:</Text>
                  </td>
                  <td className="p-3">
                    <Text appearance="body" className="text-rose-500">
                      Incomplete
                    </Text>
                  </td>
                  <td className="p-3 text-right">
                    <Button className="w-full">Begin City Event</Button>
                  </td>
                  {/* TODO: Add row for scenario status */}
                </tr>
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="col-span-2">
          <Panel>
            <Text as="h2" appearance="subheader" className="mb-4">
              Activity
            </Text>
          </Panel>
        </div>
      </div>
    </>
  );
};

export default CampaignShow;
