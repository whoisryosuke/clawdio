import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import MastheadMusicWaterfall from "../components/MastheadMusicWaterfall/MastheadMusicWaterfall";
import ClawdioBreakdown from "../components/ClawdioBreakdown/ClawdioBreakdown";
import FilterEffectsScroller from "../components/FilterEffectsScroller/FilterEffectsScroller";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Web Audio effects and filters`}
      description="An experimental project aimed to create modern effects for the Web Audio API using WASM and Rust."
    >
      <MastheadMusicWaterfall />
      <ClawdioBreakdown />
      <FilterEffectsScroller />
    </Layout>
  );
}
