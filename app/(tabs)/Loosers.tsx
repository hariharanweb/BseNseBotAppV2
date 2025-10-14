import { ScreenType } from "@/service/Api";
import GainersLoosers from "../../components/GainersLoosers";

export default function Loosers() {
    return (
        <GainersLoosers
            type={ScreenType.LOOSERS}
            allStocks={true}
        />
    )
}