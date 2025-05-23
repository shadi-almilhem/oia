"use client";
import Image from "next/image";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber = "+971504277312", // Replace with your actual WhatsApp number
  message = "Hello! I'm interested in your properties.",
}: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="flex justify-center items-center w-8 h-8">
        <Image
          src="/assets/whatsapp.svg"
          alt="WhatsApp"
          width={20}
          height={20}
          className=" w-6 h-6 "
        />
      </div>
    </button>
  );
};

export default WhatsAppButton;
