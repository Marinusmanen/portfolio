import { siteConfig } from "../siteConfig";
import TimeLineDragger from "../components/UnityTimeLine";
import { HeroDecor, TraceDivider } from "../components/Decor.jsx";
import Foto2 from "../pictures/Foto_Portfolio2.webp";
import Foto3 from "../pictures/Foto_Portfolio3.webp";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Decorations: PCB traces, VR grid, mocap / electronics / code / VR drawings */}
        <HeroDecor />

        {/* Decoratieve glow achter foto */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-(--accent) rounded-full blur-3xl opacity-20" />

        {/* Informatie */}
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          {/* Foto midden */}
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className="w-70 h-70 object-cover border-5 border-(--accent) shadow-lg mb-6"
          />

          {/* Naam en Rol */}
          <h1 className="text-5xl font-bold text-(--text) mb-2">
            {siteConfig.name}
          </h1>
          <p className="text-xl text-(--accent) font-medium mb-4">
            {siteConfig.role}
          </p>

          {/* Tagline */}
          <p className="text-lg text-(--muted) max-w-xl mb-8">
            {siteConfig.tagline}
          </p>
        </div>
      </section>

      <TraceDivider />

      {/* Timeline Title */}
      <div className="container mx-auto text-center mt-8">
        <h2 className="text-3xl font-bold text-(--text)">
          {siteConfig.TLTitle}
        </h2>
      </div>

      {/* TimeLine + Dragger Component */}
      <div className="container mx-auto mt-8 px-4">
        <TimeLineDragger />
      </div>

      <TraceDivider />

      {/* Foto + tekst blokken */}
      <section className="container mx-auto px-4 py-16 flex flex-col gap-16">
        {/* Blok 1: foto links, tekst rechts */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <img
            src={Foto2}
            alt="Foto two"
            className="w-full max-w-80 h-96 object-cover border-5 border-(--accent) shadow-lg shrink-0"
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-(--text) mb-3">
              Interesse in Electronics, VR en Motion Capture
            </h3>
            <p className="text-lg text-(--muted)">
              Al van jongs af aan ben ik gefascineerd door technologie en hoe dingen werken. Ik haalde oude apparaten uit elkaar om te ontdekken wat erin zat en raakte enthousiast over het zelf bouwen van technische projecten, onder andere toen ik mijn eerste robotarm in elkaar zette.
              Naarmate ik ouder werd, ontwikkelde ik een passie voor elektronica, virtual reality, game development en motion capture. Mijn favoriete videogame, Detroit: Become Human (van Quantic Dream), inspireerde me om zelf interactieve ervaringen te creëren waarin technologie en beleving samenkomen.
              Momenteel werk ik aan projecten met motion capture in Unreal Engine en Unity, microcontrollers zoals Arduino en ESP32, PCB-ontwerp met KiCad, en (VR) Games op mijn opleiding. Ik blijf graag experimenteren met nieuwe technieken en uitdagingen om mijn kennis en vaardigheden verder te ontwikkelen.
            </p>
          </div>
        </div>

        {/* Blok 2: tekst links, foto rechts */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <img
            src={Foto3}
            alt="Foto three"
            className="w-full max-w-80 h-96 object-cover border-5 border-(--accent) shadow-lg shrink-0"
          />
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-(--text) mb-3">
              Mijn opleiding en ervaring
            </h3>
            <p className="text-lg text-(--muted)">
              Ik ben momenteel derdejaars student XR (Extended Reality) aan het Grafisch Lyceum Utrecht, waar ik me richt op interactieve media en technologie. Tijdens mijn opleiding heb ik ervaring opgedaan met onder andere 3D-modellering, animatie, programmeren en het ontwikkelen van interactieve ervaringen.
              Ik houd me veel bezig met programmeren in C# voor Unity en C++ voor Unreal Engine en de Arduino IDE. Mijn meeste ervaring ligt bij Unity en C#, terwijl ik daarnaast veel experimenteer met C++ op het gebied van game development, elektronica en microcontrollers.
              Naast mijn opleiding werk ik aan eigen projecten, waarmee ik mijn technische en creatieve vaardigheden blijf uitbreiden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}