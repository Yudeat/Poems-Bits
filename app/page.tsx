import React from 'react'
import CardNav from './component/dashBoard'
import InfiniteScroll from './components/InfiniteScroll'

const page = () => {
  const i = [
  { content: "Text Item 1" },
  { content: <p>Paragraph Item 2</p> },
  { content: "Text Item 3" },
  { content: <p>Paragraph Item 4</p> },
  { content: "Text Item 5" },
  { content: <p>Paragraph Item 6</p> },
  { content: "Text Item 7" },
  { content: <p>Paragraph Item 8</p> },
  { content: "Text Item 9" },
  { content: <p>Paragraph Item 10</p> },
  { content: "Text Item 11" },
  { content: <p>Paragraph Item 12</p> },
  { content: "Text Item 13" },
  { content: <p>Paragraph Item 14</p> },
];
const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects/featured" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects/case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:info@example.com" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/example" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com/company/example" }
      ]
    }
  ];
  return (
    <>
<main>
<CardNav
      logo="logo.png"
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
    />
<div style={{height: '500px', position: 'relative'}}>
  <InfiniteScroll
    items={i}
    isTilted={true}
    tiltDirection='left'
    autoplay={true}
    autoplaySpeed={0.1}
    autoplayDirection="down"
    pauseOnHover={true}
  />
</div>

</main>
    </>
     
  )
}

export default page
