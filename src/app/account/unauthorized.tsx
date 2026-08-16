import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">401</p>
        <h2>Sign in required</h2>
        <p>
          You need to sign in to access this page. Your session may have expired
          or you may not have signed in yet.
        </p>
        <div className="button-row">
          <Link className="button button--primary" href="/login">
            Sign in
          </Link>
          <Link className="button button--quiet" href="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
