import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export const SnsArea = () => {
  return (
    <div className="sidebar_container sns_container">
      <p className="sidebar_title">公式SNSアカウント</p>
      <nav>
        <ul>
          <li>
            <a target="__blank" href="https://twitter.com/6qVsERA7OpoHtLH">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
