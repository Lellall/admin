import {
  Wrapper,
  NewsLetter,
  Heading,
  SubText,
  InputContainer,
  Input,
  SubmitButton,
  ButtomContainer,
  TextContainer,
  ColoredText,
  InnerContainer,
  NavContainer,
  SubHeading,
  StyledImage,
  NavItems,
} from "./footer.styles";
const Main = ({ show }) => {
  const navColumns = [
    {
      id: 1,
      heading: "About",
      subTexts: [
        "About us",
        "Blog",
        "Careers",
        "Sign up as a vendor",
        "Sign up as a courier",
      ],
    },
    {
      id: 2,
      heading: "Support",
      subTexts: [
        "Contact us",
        "Online Chat",
        "Whatsapp",
        "Telegram",
        "Ticketing",
      ],
    },
    {
      id: 3,
      heading: "FAQ",
      subTexts: [
        "Account",
        "Manage Deliveries",
        "Orders",
        "Payments",
        "Returns",
      ],
    },
  ];
  return (
    <>
      <NewsLetter show={show}>
        <div className="news-letter">
          <div className="text-container">
            <Heading>Newsletter</Heading>
            <SubText color="rgba(18, 29, 43, 0.6)" mobileSize="12px">
              Be the first one to know about discounts, offers and events weekly
              in your mailbox. Unsubscribe whenever you like with one click.
            </SubText>
          </div>
          <InputContainer>
            <div className="container">
              <img src="/assets/mail.svg" alt="mail" />
              <Input type="text" placeholder="Enter your email" />
            </div>
            <SubmitButton outlined round variant="contained">
              Submit
            </SubmitButton>
          </InputContainer>
        </div>
      </NewsLetter>
      <Wrapper>
        <ButtomContainer>
          <TextContainer>
            <StyledImage alt="lellall" src="/assets/lellall.svg" />
            <ColoredText color="#9a9ea6" mobileSize="12px">
              Léllall, an all-in-one On-demand store, aimed at disrupting the
              way people shop by revolutionizing the online retail industry and
              setting new standards in customer satisfaction, product diversity,
              and technological innovation. Our dream is to redefine
              convenience, accessibility, and the overall shopping experience.
            </ColoredText>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <a
                href="https://www.linkedin.com/company/l%C3%A9llall/about/"
                target="blank"
              >
                <img src="/assets/linkedin.svg" />
              </a>
              <a href="https://twitter.com/Lellall_ng" target="blank">
                <img src="/assets/twitter.svg" />
              </a>
              <a href="https://www.instagram.com/lellall_ng" target="blank">
                <img src="/assets/instagram.svg" />
              </a>
              <a href="https://www.tiktok.com/@lellall_ng" target="blank">
                <img src="/assets/tiktok.svg" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100091527516585"
                target="blank"
              >
                <img src="/assets/facebook.svg" />
              </a>
            </div>
          </TextContainer>
          <InnerContainer>
            {navColumns.map((column) => (
              <NavContainer key={column.id}>
                <SubHeading color="#fff">{column.heading}</SubHeading>
                <NavItems>
                  {column.subTexts.map((text, i) => (
                    <ColoredText key={i} color="#9a9ea6" mobileSize="10px">
                      {text}
                    </ColoredText>
                  ))}
                </NavItems>
              </NavContainer>
            ))}
          </InnerContainer>
        </ButtomContainer>
        <SubText color="#9a9ea6" tabletSize="16px">
          © 2023, All Rights Reserved
        </SubText>
      </Wrapper>
    </>
  );
};

export default Main;
