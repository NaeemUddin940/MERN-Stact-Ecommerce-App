import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg bg-no-repeat">
                  <h1 className="text-center text-8xl font-bold">404</h1>
                </div>

                <div className="mt-[-40px]">
                  <h3 className="text-5xl font-semibold">
                    Look like you're lost
                  </h3>

                  <p className="text-4xl font-medium">
                    the page you are looking for not avaible!
                  </p>

                  <Link
                    to="/"
                    className="bg-violet-600 hover:bg-violet-700 px-8 py-3 inline-block my-5 text-lg font-bold text-white transition-all duration-300 hover:scale-110">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
