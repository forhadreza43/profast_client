import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

export default function Faq() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 mb-4">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-white border border-gray-200 rounded-lg px-6 py-2 data-[state=open]:bg-teal-50 data-[state=open]:border-teal-200"
          >
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline">
              How does this posture corrector work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4 leading-relaxed">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here's how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-white border border-gray-200 rounded-lg px-6 py-2 data-[state=open]:bg-teal-50 data-[state=open]:border-teal-200"
          >
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline">
              Is it suitable for all ages and body types?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4 leading-relaxed">
              Yes, our posture corrector is designed to be adjustable and
              suitable for most ages and body types. It features adjustable
              straps and flexible materials that can accommodate different body
              sizes and shapes. However, we recommend consulting with a
              healthcare professional if you have specific medical conditions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-white border border-gray-200 rounded-lg px-6 py-2 data-[state=open]:bg-teal-50 data-[state=open]:border-teal-200"
          >
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline">
              Does it really help with back pain and posture improvement?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4 leading-relaxed">
              Many users report significant improvements in their posture and
              reduction in back pain after consistent use. The corrector helps
              train your muscles to maintain proper alignment, which can lead to
              long-term benefits. Results may vary depending on individual
              conditions and consistency of use.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-white border border-gray-200 rounded-lg px-6 py-2 data-[state=open]:bg-teal-50 data-[state=open]:border-teal-200"
          >
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline">
              Does it have smart features like vibration alerts?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4 leading-relaxed">
              Our advanced Posture Pro model includes smart vibration alerts
              that gently remind you when you're slouching or maintaining poor
              posture. This intelligent feedback system helps you develop better
              posture habits throughout the day without being intrusive.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="bg-white border border-gray-200 rounded-lg px-6 py-2 data-[state=open]:bg-teal-50 data-[state=open]:border-teal-200"
          >
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline">
              How will I be notified when the product is back in stock?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2 pb-4 leading-relaxed">
              You can sign up for our back-in-stock notifications by providing
              your email address. We'll send you an immediate notification as
              soon as the product becomes available again. You can also follow
              us on social media for the latest updates on product availability.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
