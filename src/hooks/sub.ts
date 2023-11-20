import { useEffect, useState } from "react";

export function useSub() {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  );
  const [subscription, setSubscription] = useState<PushSubscription | null>();

  useEffect(() => {
    (async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      const subscription = await reg?.pushManager.getSubscription();
      setSubscription(subscription);
    })();
  }, []);

  const unsubscribe = async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    const subscription = await reg?.pushManager.getSubscription();
    await subscription?.unsubscribe();
    setSubscription(null);
  };

  const subscribe = async () => {
    if (permission === "denied") return;

    const reg = await navigator.serviceWorker.getRegistration();
    let subscription = await reg?.pushManager.getSubscription();

    if (subscription) return;

    if (permission === "default") {
      const p = await window.Notification.requestPermission();
      setPermission(p);
      if (p === "denied") return;
    }

    subscription = await reg?.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC,
    });
    setSubscription(subscription);
  };

  return {
    permission,
    subscribe,
    unsubscribe,
    subscription,
  };
}
