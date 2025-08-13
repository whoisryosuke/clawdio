import BlueskyIcon from "@site/src/components/icons/social/BlueskyIcon";
import DiscordIcon from "@site/src/components/icons/social/DiscordIcon";
import GitHubIcon from "@site/src/components/icons/social/GitHubIcon";
import InstagramIcon from "@site/src/components/icons/social/InstagramIcon";
import ThreadsIcon from "@site/src/components/icons/social/ThreadsIcon";
import YouTubeIcon from "@site/src/components/icons/social/YouTubeIcon";
import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";
import "./FooterSocialLinks.css";

const LINKS = [
  {
    icon: GitHubIcon,
    href: "https://github.com/whoisryosuke/",
    title: "GitHub",
  },
  // {
  //   icon: DiscordIcon,
  //   href: "#",
  //   title: "Discord",
  // },
  {
    icon: ThreadsIcon,
    href: "https://www.threads.com/@whoisryosuke",
    title: "Threads",
  },
  {
    icon: BlueskyIcon,
    href: "https://bsky.app/profile/whoisryosuke.bsky.social",
    title: "Bluesky",
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/whoisryosuke/",
    title: "Instagram",
  },
  {
    icon: YouTubeIcon,
    href: "https://www.youtube.com/@whoisryosuke",
    title: "YouTube",
  },
];

type Props = {};

const FooterSocialLinks = (props: Props) => {
  return (
    <Stack horizontal>
      {LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <a
            href={link.href}
            title={`Follow on ${link.title}`}
            className="FooterSocialLink"
          >
            <Icon />
          </a>
        );
      })}
    </Stack>
  );
};

export default FooterSocialLinks;
