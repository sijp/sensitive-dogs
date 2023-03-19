import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faWalking,
  faHome,
  faCut,
  faPaw,
  faStar,
  faSearchLocation,
  faFutbol,
  faCameraRetro,
  faHandHoldingMedical,
  faBriefcaseMedical,
  faShoppingCart,
  faUserShield,
  faShieldAlt,
  faHotel,
  faDoorOpen,
  faBars,
  faChevronDown,
  faChevronUp,
  faCircle,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";

const ICONS = {
  faBars,
  faDog,
  faWalking,
  faHome,
  faCut,
  faPaw,
  faStar,
  faSearchLocation,
  faFutbol,
  faCameraRetro,
  faHandHoldingMedical,
  faBriefcaseMedical,
  faShoppingCart,
  faUserShield,
  faShieldAlt,
  faHotel,
  faDoorOpen,
  faFacebookF,
  faYoutube,
  faChevronDown,
  faChevronUp,
  faCircle,
  faNewspaper
};

export function SensitiveIcon({ iconName }: { iconName: string }) {
  const icon = `fa${iconName}`;
  if (!(icon in ICONS)) return null;

  return <FontAwesomeIcon icon={ICONS[icon as keyof typeof ICONS]} />;
}
