// import { authScreenStyles } from "./AuthScreen.styles";

import { AccountCircle, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";

export const Loginform = () => {
  return (
    <>
      {/* <img
        src="./src/assets/computer_sagyouin_woman.png"
        alt="hoge"
        width={300}
      /> */}
      {/* <h2>ログイン</h2> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // border: "1px solid",
          boxShadow: 4,
          padding: "40px",
          gap: 2,
        }}
      >
        {/* <p>ログイン</p> */}
        <TextField
          label="ユーザーID"
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          required
        />
        <TextField
          label="パスワード"
          variant="outlined"
          type="password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              // endAdornment: (
              //   <InputAdornment position="end">
              //     <Visibility />
              //   </InputAdornment>
              // ),
            },
          }}
          required
        />
        <Button variant="contained" size="large">
          Login
        </Button>
      </Box>
    </>
    // <div className={styles.root}>
    //   <div className={styles.inputList}>
    //     <Field className={styles.input} label="ID" required>
    //       <Input size="large" contentBefore={<PersonRegular />} />
    //     </Field>
    //     <Field className={styles.input} label="Password" required>
    //       <Input
    //         type="password"
    //         size="large"
    //         contentBefore={<PasswordRegular />}
    //       />
    //     </Field>
    //     <Button className={styles.button} size="large" appearance="primary">
    //       Login
    //     </Button>
    //   </div>
    // </div>
  );
};
