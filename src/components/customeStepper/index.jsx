import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BackHandIcon from "@mui/icons-material/BackHand";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import clsx from "clsx";
import style from "./style.module.scss";
import { Check } from "@mui/icons-material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[700],
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: theme.palette.primary.main,
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <BackHandIcon />,
    2: <ShoppingCartIcon />,
    3: <RequestQuoteIcon />,
    4: <Check />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const requesterSteps = [
  "依頼中",
  "商品購入中",
  "受け取り& <br />金額確認",
  "完了",
];
const responderSteps = [
  "受注中",
  "商品購入& <br />金額入力",
  "受け渡し&<br />金額確認中",
  "完了",
];

const CustomeStepper = ({ isRequester, statusId }) => {
  const steps = isRequester ? requesterSteps : responderSteps;
  return (
    <Stack className={style.CustomStepper} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={statusId - 1}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p className={clsx(style.CustomStepperFont)} dangerouslySetInnerHTML={{ __html: label }} />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default CustomeStepper;

CustomeStepper.propTypes = {
  isRequester: PropTypes.bool,
  statusId: PropTypes.number,
};
