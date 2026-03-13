import SettingsPage from '@/widgets/Settings';
import DashboardComponent from '@/widgets/dashboard';

export default function Settings() {
  return (
    <>
      <DashboardComponent>
        <SettingsPage />
      </DashboardComponent>
    </>
  );
}
