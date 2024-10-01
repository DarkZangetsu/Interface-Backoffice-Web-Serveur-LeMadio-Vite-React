import { Phone, Mail, Linkedin, Instagram, Facebook } from "lucide-react";
import "../../tailwind.css";
import "../../styles.css";
import LoginForm from "../../components/LoginForm";

const Logo = () => (
  <div className="flex justify-center mb-1">
    {/* Image du logo */}
    <img
      src="LOGO-ADES_HD.png"
      alt="Logo ADES"
      className="w-28-5  h-28-5 object-container"
    />
  </div>
);

// eslint-disable-next-line react/prop-types
const ContactButton = ({ Icon }) => (
  <button className="w-8 h-8 rounded-full border border-[#4B8B32] flex items-center justify-center text-[#4B8B32] hover:bg-[#4B8B32] hover:text-white transition-colors duration-300">
    <Icon size={16} />
  </button>
);

const ADESLogin = () => {
  return (
    <div className="bg-custom min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
      <div className="w-[800px] h-[400px] bg-white border border-gray-100 rounded-lg shadow-lg relative z-10 flex">
        <div className="w-1/2 p-8 flex flex-col justify-between">
          <div>
            <Logo />
            <h2 className="flex justify-center text-2xl font-bold text-[#4B8B32] mb-8">
              Bienvenue chez ADES !
            </h2>
          </div>
          <div>
            <p className="flex justify-center text-sm text-[#4B8B32] mb-2">
              Contactez-nous !
            </p>
            <div className="flex justify-center space-x-2">
              <ContactButton Icon={Phone} />
              <ContactButton Icon={Mail} />
              <ContactButton Icon={Linkedin} />
              <ContactButton Icon={Instagram} />
              <ContactButton Icon={Facebook} />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-8 flex items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default ADESLogin;
