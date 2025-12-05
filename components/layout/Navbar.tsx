'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Button from '@/components/atoms/Button';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  if (!user) return null;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/learn', label: 'Learn' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/tools', label: 'Tools' },
    { href: '/stories', label: 'Stories' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cream-dark/10 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-money-green to-money-green-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MW</span>
              </div>
              <span className="hidden sm:inline text-xl md:text-2xl font-bold text-navy font-heading">
                MoneyWise
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-money-green'
                      : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-money-green to-money-green-light rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex flex-col items-end"
            >
              <p className="text-sm font-semibold text-navy">{user.name}</p>
              <motion.p
                className="text-xs text-money-green font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Level {user.progress?.level || 1}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
              >
                Logout
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden flex justify-around py-3 border-t border-cream-dark/10"
        >
          {navItems.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-money-green'
                    : 'text-navy/60'
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="w-1 h-1 bg-money-green rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}
