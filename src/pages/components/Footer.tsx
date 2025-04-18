import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="text-white w-full  px-6 py-10"
      style={{
        backgroundImage: "linear-gradient(90deg, #000000, #1e293b)", 
        backgroundSize: "200% 100%",
        backgroundPosition: "left center",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], 
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          {
            title: "COMPANY",
            items: [
              "About us ✨",
              "Press Room",
              "Gift Card",
              "Integrations",
              "Reviews",
              "Advertise",
              "Contacts",
              "Developers",
            ],
          },
          {
            title: "NETWORK",
            items: [
              "Lnk.at",
              "Linkinbio",
              "Daily News",
              "Templates",
              "Ln.ki",
              "Icons.Bio",
              "Lnk.Bio for ...",
              "Payment Methods",
            ],
          },
          {
            title: "FEATURES",
            items: [
              "Newsletter",
              "Booking Calendar",
              "Custom Domain",
              "All features",
              "Shop",
              "Verify",
              "APIs",
            ],
          },
          {
            title: "GLOBALS",
            items: [
              "Lnk.at",
              "Linkinbio",
              "Daily News",
              "Templates",
              "Ln.ki",
              "Icons.Bio",
              
              
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="text-md font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 text-sm hover:text-gray-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        © 2023 Your Company. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;