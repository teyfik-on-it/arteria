import {
  Box,
  Burger,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Header,
  Menu,
  ScrollArea,
  Text,
  UnstyledButton,
  clsx,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'teyfik-i18n-next';
import Logo from '../Logo';

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },
}));

type NavItem = { label: string } & (
  | { href: string; locale?: string }
  | { children: { href: string; locale?: string; label: string }[] }
);

function MobileMenu({ item }: { item: NavItem }) {
  const { t } = useTranslation();
  const { classes, theme } = useStyles();
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { asPath } = useRouter();

  if ('children' in item) {
    return (
      <>
        <UnstyledButton
          className={clsx(classes.link, 'w-full py-4 px-8')}
          onClick={toggleLinks}
        >
          <div className="flex justify-between">
            <Box component="span" mr={5}>
              {t(item.label)}
            </Box>
            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
          </div>
        </UnstyledButton>
        <Collapse in={linksOpened}>
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href || asPath}
              locale={child.locale}
              className="block px-4 py-2"
            >
              <UnstyledButton className={classes.subLink}>
                <Text size="sm" fw={500}>
                  {t(child.label)}
                </Text>
              </UnstyledButton>
            </Link>
          ))}
        </Collapse>
      </>
    );
  }

  return (
    <Link
      key={item.href}
      href={item.href || asPath}
      locale={item.locale}
      className={clsx(classes.link, 'py-4 px-8')}
    >
      {t(item.label)}
    </Link>
  );
}

interface HeaderSearchProps {
  items: NavItem[];
}

export default function HeaderMenu({ items }: HeaderSearchProps) {
  const { t } = useTranslation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { asPath } = useRouter();

  return (
    <>
      <Header height={56}>
        <Container>
          <div className={classes.inner}>
            <Logo />

            <Group spacing={5} className={classes.links}>
              {items.map((item) => {
                if ('children' in item) {
                  return (
                    <Menu
                      key={item.label}
                      trigger="hover"
                      transitionProps={{ exitDuration: 0 }}
                      withinPortal
                    >
                      <Menu.Target>
                        <span
                          className={classes.link}
                          onClick={(event) => event.preventDefault()}
                        >
                          <Center>
                            <span
                              className={clsx(
                                classes.linkLabel,
                                'cursor-default',
                              )}
                            >
                              {t(item.label)}
                            </span>
                            <IconChevronDown size="0.9rem" stroke={1.5} />
                          </Center>
                        </span>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {item.children.map((child) => (
                          <Menu.Item key={child.href}>
                            <Link
                              href={child.href || asPath}
                              locale={child.locale}
                            >
                              {t(child.label)}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href || asPath}
                    locale={item.locale}
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                  >
                    {t(item.label)}
                  </Link>
                );
              })}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
          </div>
        </Container>
      </Header>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={t('common.title')}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          {items.map((item) => (
            <MobileMenu key={item.label} item={item} />
          ))}

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
        </ScrollArea>
      </Drawer>
    </>
  );
}
