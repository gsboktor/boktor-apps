import { InnerBlock, Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';

export const GeorgeBoktorDetails = () => {
  return (
    <InnerBlock style={{ gap: 24 }}>
      <InnerBlock style={{ gap: 8 }}>
        <StyledText size={Size.MD}>georgeboktor.me details</StyledText>
        <StyledText size={Size.SM} style={{ color: '#008578' }}>
          *personal portfolio... you're looking at it
        </StyledText>
      </InnerBlock>
      <StyledText size={Size.SM}>
        My personal portfolio, thoughtfully curated for others to get a better sense of my technical expertise, and some of the things
        i'm actively building or supporting.
      </StyledText>
      <StyledText size={Size.SM}>
        built w/ React, Typescript, Jotai, Framer Motion, and deployed on AWS S3 via AWS Cloudfront
      </StyledText>
      <StyledText size={Size.SM}>tested, monitored, and managed with Jest, Playwright, PostHog & Github Actions</StyledText>
    </InnerBlock>
  );
};
