import { PageLayout, UsersList } from '~components';
import { USERS } from '../mocks';

export default function Home() {
  return (
    <PageLayout>
      <UsersList users={USERS} />
    </PageLayout>
  );
}
