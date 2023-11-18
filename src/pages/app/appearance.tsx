import Container from "@/components/common/container";
import { AppearanceForm } from "@/components/forms/appearance-form";

export default function SettingsAppearancePage() {
  return (
    <Container
      title="Appearance"
      description="Customize the appearance of the app. Automatically switch between day
          and night themes."
    >
      <AppearanceForm />
    </Container>
  );
}
