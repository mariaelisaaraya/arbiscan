import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState((state) => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {isLocalNetwork && (
              <>
                <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Block EXPLORER</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>

      {/* Features section */}
      <section className="container py-12 md:py-24">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card border-none shadow-lg bg-gradient-to-b from-background to-background/80 text-center flex-grow p-4">
            <div className="flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-primary mr-2" />
              <div className="text-xl">Automatic Contract Scanning</div>
            </div>
            <div className="card-content">
              <div className="text-base">Detect vulnerabilities in smart contracts using advanced scanning technology.</div>
            </div>
          </div>
          <div className="card border-none shadow-lg bg-gradient-to-b from-background to-background/80 text-center flex-grow p-4">
            <div className="flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-primary mr-2" />
              <div className="text-xl">Simple Integrations</div>
            </div>
            <div className="card-content">
              <div className="text-base">Easily connect to your favorite tools and workflows for enhanced analysis.</div>
            </div>
          </div>
          <div className="card border-none shadow-lg bg-gradient-to-b from-background to-background/80 text-center flex-grow p-4">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon className="h-6 w-6 text-primary mr-2" />
              <div className="text-xl">451+ Vulnerability Detectors</div>
            </div>
            <div className="card-content">
              <div className="text-base">Comprehensive security analysis covering all known attack vectors.</div>
            </div>
          </div>
          <div className="card border-none shadow-lg bg-gradient-to-b from-background to-background/80 text-center flex-grow p-4">
            <div className="flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-primary mr-2" />
              <div className="text-xl">Generate Audit Reports</div>
            </div>
            <div className="card-content">
              <div className="text-base">Generate detailed reports with clear recommendations for enhancing security.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
