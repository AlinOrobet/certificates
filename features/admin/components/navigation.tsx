"use client";

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useMedia} from "react-use";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import {NavButton} from "./nav-button";
import {useTranslations} from "next-intl";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  locale: string;
};

export const Navigation = ({locale}: Props) => {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width:1024px)", false);

  const isAdmin = pathname.includes("admin");

  const routes = [
    {
      href: `/${locale}/admin`,
      label: t("OVERVIEW"),
    },
    {
      href: `/${locale}/admin/secretaries`,
      label: t("SECRETARIES"),
    },
    {
      href: `/${locale}/admin/students`,
      label: t("STUDENTS"),
    },
  ];

  const secretaryRoutes = [
    {
      href: `/${locale}/secretary`,
      label: t("CERTIFICATES_NEW"),
    },
    {
      href: `/${locale}/secretary/aproved`,
      label: t("CERTIFICATES_APROVED"),
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        <Skeleton className="h-9 rounded-md px-3 flex items-center justify-center animate-none bg-white/10 lg:hidden cursor-not-allowed">
          <MenuIcon className="size-4 text-white/75" />
        </Skeleton>
        <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
          {new Array(3).fill("").map((_, index) => (
            <Skeleton key={index} className="w-20 h-[36px] transition animate-pulse bg-white/10" />
          ))}
        </div>
      </>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focust:bg-white/30 transition"
          >
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex justify-center w-full p-6 relative lg:hidden border-b">
            <Link href={`/${locale}/dashboard`}>
              <div className="items-center lg:flex">
                <Image src="/logo-blue.svg" alt="logo" height={50} width={50} />
              </div>
            </Link>
          </div>
          <nav className="flex flex-col gap-y-2 pt-6">
            {isAdmin ? (
              <>
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    onClick={() => onClick(route.href)}
                    variant={route.href === pathname ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {route.label}
                  </Button>
                ))}
              </>
            ) : (
              <>
                {secretaryRoutes.map((route) => (
                  <Button
                    key={route.href}
                    onClick={() => onClick(route.href)}
                    variant={route.href === pathname ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {route.label}
                  </Button>
                ))}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {isAdmin ? (
        <>
          {routes.map((route) => (
            <NavButton
              key={route.href}
              href={route.href}
              label={route.label}
              isActive={pathname === route.href}
            />
          ))}
        </>
      ) : (
        <>
          {secretaryRoutes.map((route) => (
            <NavButton
              key={route.href}
              href={route.href}
              label={route.label}
              isActive={pathname === route.href}
            />
          ))}
        </>
      )}
    </nav>
  );
};
