import Image from "next/image";

export default function LandingImage() {
  return (
    <section className="relative w-full h-full rounded-4xl overflow-hidden">
      <Image src={"/login_img.webp"} alt="Login Image" fill />
    </section>
  );
}
