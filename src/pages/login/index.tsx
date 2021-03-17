// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Component
import PrimaryButton from "../../components/PrimaryButton";
import CustomDivider from "../../components/CustomDivider";
import FormInput from "../../components/FormInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";
// import InstagramLoginButton from "../../components/InstagramLoginButton";

// Context
import { useAuth, useApp, AuthState } from "../../contexts";

// Constants
import { googleAppId } from "../../constants";

// APIs
// import { getInstagramProfile } from "../../api";

import useStyles from "./styles";

export default function Login() {
  const router = useRouter();
  const { login, socialLogin, status } = useAuth();
  const { setRegistrationCallbackData } = useApp();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        password: yup.string().required("Password field field is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Submit normal login, by email and password
  const onSubmit = async (data: Login.FormData) => {
    const result = await login(data.email, data.password, router.query && router.query.callback !== undefined);

    // Callback is available, go straight to that page now
    if (router.query && router.query.callback && router.query.type && !result.error) {
      // Save current user data and marker the callback status so that callback page will know
      setRegistrationCallbackData({ ...result.data.user, ...{ registerType: router.query.type } });
      router.push(`/${router.query.callback}`);
    }
  };

  // Submit google login, using social id
  const handleGoogleLogin = async (user: any) => {
    const {
      _profile: { id, email },
    } = user;

    const result = await socialLogin(id, email, router.query && router.query.callback !== undefined);

    // Callback is available, go straight to that page now
    if (router.query && router.query.callback && router.query.type && !result.error) {
      // Save current user data and marker the callback status so that callback page will know
      setRegistrationCallbackData({ ...result.data.user, ...{ registerType: router.query.type } });
      router.push(`/${router.query.callback}`);
    }
  };

  const handleGoogleLoginFailure = () => {
    // Just refresh the page
    window.location.reload();
  };

  // useEffect(() => {
  //   // Code is present, this is a callback from instagram
  //   if (router.query && router.query.code) {
  //     // Callback from instagram login
  //     getInstagramProfile({
  //       code: router.query.code,
  //       redirectUrl: `${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`,
  //     }).then((data) => {
  //       // Any error happens, go back to login page
  //       if (data.error) {
  //         router.replace("/login");
  //       } else {
  //         const {
  //           data: { id },
  //         } = data;
  //         socialLogin(id);
  //       }
  //     });
  //   }
  // }, [router.query]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justify={"center"}>
          <Link href={"/home"}>
            <img src={"/images/left-background-landing-page.png"} alt={"background"} className={classes.image} />
          </Link>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Typography variant={"h5"} className={classes.title}>
            Hi, Welcome back!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <Typography className={classes.subTitle} display={"block"}>
              Continue with:
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} xs={12}>
                {status !== AuthState.pending && (
                  <GoogleLoginButton
                    provider="google"
                    appId={googleAppId}
                    onLoginSuccess={handleGoogleLogin}
                    onLoginFailure={handleGoogleLoginFailure}
                  >
                    Login with Google
                  </GoogleLoginButton>
                )}
              </Grid>
              {/*<Grid container item lg={2} md={2} xs={2} justify={"center"}>*/}
              {/*  <InstagramLoginButton*/}
              {/*    provider="instagram"*/}
              {/*    appId={instagramAppId}*/}
              {/*    scope={"user_profile"}*/}
              {/*    redirect={`${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>

            <CustomDivider className={classes.dividerContainer}>
              <Typography className={classes.greyText}>Or</Typography>
            </CustomDivider>

            <FormInput
              name="email"
              classes={{ root: classes.formInput }}
              label={"Email Address"}
              id="email"
              placeholder={"Email address"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.email}
            />

            <FormInput
              name="password"
              label={"Password"}
              id="password"
              placeholder={"Password"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.password}
              type={"password"}
            />

            <PrimaryButton
              className={classes.signUpButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              bluePastel
            >
              Login
            </PrimaryButton>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Forgot password?</Typography>
              <Typography className={classes.forgotPasswordText}>
                <Link href={"/forgot-password"}>Click here</Link>
              </Typography>
            </Grid>

            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              className={classes.joinArtistButton}
              bluePastel
              fullWidth
              href={"/register-selection"}
            >
              Join as artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
