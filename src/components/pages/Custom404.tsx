import Header from "components/common/Header";
import LinkText from "components/common/LinkText";

const Custom404 = () => {
  return (
    <>
      <Header />
      <main>
        <h1>404 Not Found</h1>
        <p className="pb-8">
          申し訳ございません。お探しのページは見つかりませんでした。
        </p>
        <LinkText text="トップページに戻る" href="/" />
      </main>
    </>
  );
};

export default Custom404;
