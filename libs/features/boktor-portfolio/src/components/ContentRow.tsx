import styled from 'styled-components'

const ContentRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  gap: 16px;
`

export const ContentRow = ({ children }: { children: React.ReactNode }) => {
  return <ContentRowContainer>{children}</ContentRowContainer>
}
