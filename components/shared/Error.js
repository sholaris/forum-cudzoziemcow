import Link from "next/link";

const Error = () => {
  return (
    <h2 className="err-msg">
      <Link href="/sign-in">
        <a>Zaloguj się</a>
      </Link>{" "}
      lub{" "}
      <Link href="/register">
        <a>załóż konto</a>
      </Link>{" "}
      by móc głosować
    </h2>
  );
};

export default Error;
