"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CrossIcon from "@/assets/icons/cross.svg";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export const NavigationPreferenceDialog = ({
  open,
  onClose,
  appleMapsUrl,
  googleMapsUrl,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  appleMapsUrl: string;
  googleMapsUrl: string;
}) => {
  const t = useTranslations();

  const openLink = (type: "apple" | "google") => {
    if (type === "apple") {
      window.open(appleMapsUrl, "_blank");
    } else {
      window.open(googleMapsUrl, "_blank");
    }
    localStorage.setItem("escape_navigation_preference", type);
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-30 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white p-6 duration-300 w-lg rounded-md ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <DialogTitle as="h3" className="font-medium">
                {t("pages.navigation.dialog_title")}
              </DialogTitle>
              <button onClick={() => onClose(false)}>
                <CrossIcon className="fill-current w-6" />
              </button>
            </div>
            <Button
              className="mt-5 w-full"
              color="purple"
              onClick={() => openLink("apple")}
            >
              Apple Maps
            </Button>
            <Button className="mt-2 w-full" onClick={() => openLink("google")}>
              Google Maps
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
