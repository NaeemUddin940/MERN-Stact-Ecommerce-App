import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <div>
      {" "}
      <footer className="bg-muted DmSans pb-5 px-5 text-primary font-sans border-t-2 border-gray-500">
        <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold text-popover-foreground mb-4">
              Contact Us
            </h3>
            <address className="not-italic text-[17px] space-y-2">
              <p>Classyshop - Mega Super Store</p>
              <p>507-Union Trade Centre</p>
              <p>France</p>
            </address>
            <p className="mt-4 text-sm">
              <a
                href="mailto:sales@yourcompany.com"
                className="text-chart-4 hover:text-chart-1 text-[17px]">
                mdnaeemuddin14@gmail.com
              </a>
            </p>
            <p className="mt-2 text-sm text-chart-1 font-semibold">
              (+91) 9876-543-210
            </p>
            <div className="flex items-center mt-4">
              <span className="ml-2 text-[17px]">
                Online Chat
                <br />
                Get Expert Help
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-popover-foreground mb-4">
                Products
              </h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Prices Drop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    New Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Best Sales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Sitemap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Stores
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-popover-foreground mb-4">
                Our Company
              </h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Legal Notice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Terms And Conditions Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Secure Payment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-chart-1 text-[17px]">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-popover-foreground mb-4">
              Subscribe To Newsletter
            </h3>
            <p className="text-[17px] text-primary mb-4">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chart-1"
              />
              <button
                type="submit"
                className="w-full bg-chart-4 text-white p-2 rounded-lg font-semibold hover:bg-chart-1 transition-colors">
                SUBSCRIBE
              </button>
              <label className="flex items-start text-xs text-gray-500">
                <input
                  type="checkbox"
                  className="mr-2 mt-1 rounded text-chart-1"
                />
                <span className="text-sm">
                  I agree to the terms and conditions and the privacy policy
                </span>
              </label>
            </form>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="flex fixed bottom-0 right-0 z-9999 items-center justify-end -translate-x-8 -translate-y-9">
          <button
            className="w-10 cursor-pointer h-10 flex items-center justify-center bg-chart-1 text-white rounded-full shadow-lg hover:bg-chart-4 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp />
          </button>
        </div>
      </footer>
    </div>
  );
}
