import { InnerBlock, Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';

export const NomopomoDetails = () => {
  return (
    <InnerBlock style={{ gap: 24 }}>
      <InnerBlock style={{ gap: 8 }}>
        <StyledText size={Size.MD}>nomopomo.io details</StyledText>
        <StyledText size={Size.SM} style={{ color: '#008578' }}>
          *productivity web app
        </StyledText>
      </InnerBlock>
      <StyledText size={Size.SM}>
        kanban board & pomodoro timer fusion app with support for rich animations and exporting local data.
      </StyledText>

      <StyledText size={Size.SM}>built w/ React, Typescript, Jotai, DnDKit, Motion, and deployed on AWS S3 via cloudfront</StyledText>

      <StyledText size={Size.SM}>tested, monitored, and managed with Jest, Playwright, PostHog & Github Actions</StyledText>

      <video
        width={420}
        height={370}
        autoPlay={true}
        playsInline={true}
        preload="auto"
        loop={true}
        muted={true}
        style={{ borderRadius: 12, objectFit: 'fill', alignSelf: 'center' }}
      >
        <source src="/assets/images/nomopomo_preview.mp4" />
      </video>
    </InnerBlock>
  );
};
