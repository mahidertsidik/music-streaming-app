
import Allsongs from "../components/Allsongs";

import FrontedLayout from "@/layouts/FrontedLayout";
export default function Home() {
  return (
    <FrontedLayout>
    
      <div className="min-h-screen">
        <Allsongs />
      </div>
    </FrontedLayout>
  );
}
