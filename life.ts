import { buildDream } from "./motivation";
import { buildAnyway } from "./discipline";

function life(){
    try {
        buildDream()
    } catch (reality: unknown) {
        console.log('Reality interrupted', reality)
        buildAnyway()
    }
}

life()