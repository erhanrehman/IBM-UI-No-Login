import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenuButton, // Make sure to import HeaderMenuButton here
} from '@carbon/react';
import Link from 'next/link';

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <Link href="/" passHref>
          {' '}
          {/* Ensure href is correctly set to "/" for the home page */}
          <HeaderName prefix="IBM">Carbon Tutorial</HeaderName>
        </Link>
        <HeaderNavigation aria-label="Carbon Tutorial Navigation">
          <Link href="/repos" passHref>
            <HeaderMenuItem>Repositories</HeaderMenuItem>
          </Link>
          <Link href="/admin" passHref>
            <HeaderMenuItem>Administrators</HeaderMenuItem>
          </Link>
          <Link href="/racer" passHref>
            <HeaderMenuItem>Racer</HeaderMenuItem>
          </Link>
          <Link href="/spectator" passHref>
            <HeaderMenuItem>Spectator</HeaderMenuItem>
          </Link>
        </HeaderNavigation>
        <HeaderGlobalBar>{/* Global Actions */}</HeaderGlobalBar>
      </Header>
    )}
  />
);

export default TutorialHeader;
