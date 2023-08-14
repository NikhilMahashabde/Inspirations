import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { DataContext } from "../context/AppContext";
import { SiYourtraveldottv } from "react-icons/si";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, userName } = useContext(DataContext);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <IconButton
            as={ReactRouterLink}
            to={"/"}
            icon={<SiYourtraveldottv />}
            aria-label="YourTravel Icon Link"
            size="sm" // Adjust the size if needed
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav isAuthenticated={isAuthenticated} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isAuthenticated && (
            <>
              <Button
                colorScheme="blue"
                as={ReactRouterLink}
                to={"/login"}
                fontSize={"sm"}
                fontWeight={400}
                // variant={"link"}
              >
                Sign In
              </Button>

              <Button
                as={ReactRouterLink}
                colorScheme="gray"
                to={"/register"}
                // display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={400}
                // color={"white"}
                // bg={"pink.400"}
                // variant={"link"}
                // _hover={{
                //   bg: "pink.300",
                // }}
              >
                Sign Up
              </Button>
            </>
          )}

          {isAuthenticated && (
            <Button
              as={ReactRouterLink}
              to={"/logout"}
              colorScheme="blue"
              // display={{ base: "none", md: "inline-flex" }}
              // fontSize={"sm"}
              fontWeight={400}
              // color={"white"}
              // bg={"pink.400"}
              // variant={"link"}
              // _hover={{
              //   bg: "pink.300",
              // }}
            >
              Logout ({userName})
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isAuthenticated={isAuthenticated} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  if (!isAuthenticated) return null;

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={ReactRouterLink}
                to={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                isExternal={navItem.isExternal}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={ReactRouterLink}
      to={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const bgColour = useColorModeValue("white", "gray.800");
  if (!isAuthenticated) return null;

  return (
    <Stack bg={bgColour} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map(
        (navItem) =>
          isAuthenticated && <MobileNavItem key={navItem.label} {...navItem} />
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        as={ReactRouterLink}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isExternal?: boolean;
  isAuth?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "My Trips",
    isAuth: true,
    children: [
      {
        label: "My Trips",
        subLabel: "Show all trips available to me",
        href: "/trips",
      },
      {
        label: "Add new trip",
        subLabel: "Start your exciting new journey today",
        href: "/trips/create",
      },
    ],
  },
  // {
  //   label: "Search public trips",
  //   href: "/trips/search",
  // },
  {
    label: "About the author",
    href: "https:nikhilmahashabde.netlify.app/", // Update this to your website's URL
    isExternal: true, // Indicate an external link
  },
  {
    label: "Sponsor this project",
    href: "https:nikhilmahashabde.netlify.app/", // Update this to your website's URL
    isExternal: true,
  },
];
