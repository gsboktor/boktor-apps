import { InnerBlock, Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';

export const RuumeDetails = () => {
  return (
    <InnerBlock style={{ gap: 24 }}>
      <InnerBlock style={{ gap: 8 }}>
        <StyledText size={Size.MD}>ruume details</StyledText>
        <StyledText size={Size.SM} style={{ color: '#008578' }}>
          *social blogging React Native application
        </StyledText>
      </InnerBlock>
      <StyledText size={Size.SM}>
        A social blogging application that allows users to create personalized 'Ruumes' to share and aggregate their content for
        private followers.
      </StyledText>

      <StyledText size={Size.SM}>
        built w/ React Native, Typescript, Jotai, Tanstack Query, React Native Reanimated, and powered by Supabase
      </StyledText>

      <StyledText size={Size.SM}>tested, monitored, and managed with Jest, Detox, Mixpanel & Github Actions</StyledText>
      <InnerBlock style={{ flexDirection: 'row', gap: 8 }}>
        <img
          alt="mobile app preview"
          src="/assets/images/ruume_preview.png"
          style={{ width: `100%`, height: 360, borderRadius: 12 }}
        />
      </InnerBlock>
    </InnerBlock>
  );
};
