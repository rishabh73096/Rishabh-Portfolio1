import { SocialIcons } from "@/components/social-icons";

/** Fixed bottom icon dock, mobile only — keeps social links + theme toggle thumb-reachable instead of crowding the top nav. */
export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
      <div className="rounded-xl border border-dashed border-border bg-background/95 px-1 py-1 shadow-lg backdrop-blur">
        <SocialIcons iconClassName="size-10" />
      </div>
    </div>
  );
}
