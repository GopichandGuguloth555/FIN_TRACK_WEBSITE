import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-20 bg-brand-purpleLight text-center">
      <h2 className="text-3xl font-bold text-brand-purpleDark">
        Ready to take control of your money?
      </h2>
      <p className="text-brand-textMuted mt-2">
        Join thousands managing finances with FinTrack.
      </p>

      <Link to="/signup">
        <Button className="mt-6 bg-brand-purpleDark text-white text-lg px-8 py-3 rounded-lg">
          Get Started
        </Button>
      </Link>
    </section>
  );
}
