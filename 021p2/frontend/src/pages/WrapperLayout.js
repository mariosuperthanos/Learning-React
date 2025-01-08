import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useLoaderData, useNavigation } from "react-router";

const WrapperLayout = () => {
  // const navigation = useNavigation();


  return(
    <Fragment>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </Fragment>
  )
}

export default WrapperLayout;