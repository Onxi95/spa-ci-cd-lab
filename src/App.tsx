import { IndexLayout } from "@/layouts/IndexLayout";
import { MuiProvider } from "@/lib/mui/MuiProvider";
import { TanstackQueryProvider } from "@/lib/tanstack-query/TanstackQueryProvider";
import { UserNameProvider } from "@/modules/user/providers/UserNameProvider";

import { IndexPage } from "./pages";

function App() {
  return (
    <MuiProvider>
      <TanstackQueryProvider>
        <UserNameProvider>
          <IndexLayout>
            <IndexPage />
          </IndexLayout>
        </UserNameProvider>
      </TanstackQueryProvider>
    </MuiProvider>
  );
}

export default App;
