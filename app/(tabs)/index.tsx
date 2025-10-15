import GainersLoosers from '@/components/GainersLoosers';
import { ScreenType } from '@/service/Api';

export default function HomeScreen() {
  return (
    <GainersLoosers
      type={ScreenType.GAINERS}
    />
  );
}