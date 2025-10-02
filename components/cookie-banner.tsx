"use client";

import { useCallback, useMemo, useState } from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";

import posthog from "posthog-js";

// configure this as you wish
const COOKIE_CONSENT_STATUS = "cookie_consent_status";

enum ConsentStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Unknown = "unknown",
}

export function CookieBanner() {
  const { status, accept, reject } = useCookieConsent();

  if (!isBrowser()) {
    return null;
  }

  if (status !== ConsentStatus.Unknown) {
    return null;
  }

  return (
    <DialogPrimitive.Root open modal={false}>
      <DialogPrimitive.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`dark:shadow-primary-500/40 bg-background animate-in fade-in zoom-in-95 slide-in-from-bottom-16 fill-mode-both fixed bottom-0 z-50 w-full max-w-lg border p-6 shadow-2xl delay-1000 duration-1000 lg:bottom-[2rem] lg:left-[2rem] lg:h-48 lg:rounded-lg`}
      >
        <div className={"flex flex-col space-y-4"}>
          <DialogPrimitive.Title className="font-heading scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl">
            Hey, we use cookies 🍪
          </DialogPrimitive.Title>

          <DialogPrimitive.Description
            className={"text-gray-500 dark:text-gray-400"}
          >
            This website uses cookies to ensure you get the best experience on
            our website.
          </DialogPrimitive.Description>

          <div className={"flex justify-end space-x-2.5"}>
            <Button variant={"ghost"} onClick={reject}>
              Reject
            </Button>

            <Button autoFocus onClick={accept}>
              Accept
            </Button>
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
}

export function useCookieConsent() {
  const initialState = getStatusFromLocalStorage();
  const [status, setStatus] = useState<ConsentStatus>(initialState);

  const accept = useCallback(() => {
    const status = ConsentStatus.Accepted;
    posthog.opt_in_capturing();

    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  const reject = useCallback(() => {
    const status = ConsentStatus.Rejected;
    posthog.opt_out_capturing();

    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  const clear = useCallback(() => {
    const status = ConsentStatus.Unknown;

    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  return useMemo(() => {
    return {
      clear,
      status,
      accept,
      reject,
    };
  }, [clear, status, accept, reject]);
}

function storeStatusInLocalStorage(status: ConsentStatus) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(COOKIE_CONSENT_STATUS, status);
}

function getStatusFromLocalStorage() {
  if (!isBrowser()) {
    return ConsentStatus.Unknown;
  }

  const status = localStorage.getItem(COOKIE_CONSENT_STATUS) as ConsentStatus;

  return status ?? ConsentStatus.Unknown;
}

function isBrowser() {
  return typeof window !== "undefined";
}
