import Head from "next/head";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";

const BaseLayout = ({
  children,
  title = "Forum cudzoziemców",
  handleSearch,
  handleChange,
}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>
      <Navigation handleSearch={handleSearch} handleChange={handleChange} />
      <React.Fragment>{children}</React.Fragment>
      <Footer />
    </div>
  );
};

export default BaseLayout;
