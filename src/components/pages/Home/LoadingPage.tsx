import Header from "components/common/Header";
import Loading from "components/common/Loading";
import Tab from "components/common/Tab";

const LoadingPage = () => {
  return (
    <>
      <Header />
      <Tab />
      <main>
        <div className="my-4 flex justify-center">
          <Loading />
        </div>
      </main>
    </>
  );
};

export default LoadingPage;
