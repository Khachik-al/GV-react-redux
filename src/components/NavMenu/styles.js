import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const AsideWrapper = styled.aside`
  width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView ? '100vw' : '210px'};
  height: ${props => props.mobileView ? props.isOpen ? '100vw' : '70px' : '100vw'};
  transition: .2s;
  z-index: 999;
  position: relative;
  .aside-header {
    padding: 15px 20px;
  }
`;

export const AsideHeader = styled.div`
  width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView && StyleConstants.ASIDE_WIDTH_CLOSED};
  background-color: ${StyleConstants.ASIDE_HEADER_BG};
  display: flex;
  align-items: center;
  height: ${StyleConstants.ASIDE_HEADER_HEIGHT};
  overflow: hidden;
  position: relative;
  z-index: 22;
  color: #333333;
  background-color: ${StyleConstants.BLOCK_COLOR};
  .logo-area {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-logo {
    width: 95px;
    height: 50px;
    position: absolute;
    left: 70px;
  }
  .aside-close-icon {
    font-size: 24px;
    cursor: pointer;
  }
`;

export const AsideBody = styled.div`
  background-color: ${StyleConstants.BLOCK_COLOR};
  height: ${props => props.mobileView ? '100vh' : '100%'};
  width: 100%;
  ${props => props.mobileView ? { position: 'absolute', left: props.isOpen ? '0px' : '-' + (StyleConstants.ASIDE_WIDTH_CLOSED) } : {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    width: '300px',
    paddingTop: '30px',
    boxShadow: '0px 3px 30px rgba(71, 72, 73, 0.05)'
  }}
`;

export const MenuListUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 8px 0 0 22px;
  

  .list-item {
    &:hover {
       a {color: ${StyleConstants.BRAND_COLOR}};
      }
    a {
      width: auto;
      background-color: transparent;
      border: none;
      font-family: ${StyleConstants.FONT_FAMILY};
      padding: 7px 20px 7px 10px;
      color: #333333;
      display: flex;
      align-items: center;
      margin-bottom: 0px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      justify-content: flex-start;
      text-decoration: none;
      span{
        display: ${props => props.isOpen ? 'block' : 'none'};
      }
    }

    .selected-nav-link {
      color: ${StyleConstants.BRAND_COLOR};
      .menu-list-icon {
        color: ${StyleConstants.BRAND_COLOR};
      }
    }
  }

  .menu-list-item--text {
    flex-shrink: 0;
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
  .as-title {
    padding: 20px 30px 0;
    display: ${props => props.isOpen ? 'block' : 'none'};
    white-space: nowrap;
    color: ${StyleConstants.ASIDE_MENU_TEXT_TITLE_COLOR};
    text-transform: uppercase;
    font-size: 11px;
  }
  &:first-child {
    margin-top: 10px;
  }
`;

export const MenuListLi = styled.li`
margin-bottom: 10px;
color: ${props => props.color};


`


export const ShortLogo = styled.div`
  background-color: grey;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  font-size: 32px;
  align-items: center;
  justify-content: center;
  font-family: ${StyleConstants.FONT_FAMILY};
  font-weight: 900;
  cursor: pointer;
  @media (max-width: 1300px) {
  font-size: 28px;
  }
`;

export const DashMenu = styled.div`
font-family: ${StyleConstants.FONT_FAMILY};
padding-left: 20px;
padding-top: 25px;
color: #333333;
margin-bottom: 0px;
font-size: 15px;
visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
`
export const LogoBlock = styled.div`
padding-left: 80px;

`