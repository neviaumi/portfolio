import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import cms from '../../../../cms.ts';

// eslint-disable-next-line react-refresh/only-export-components
export async function prepareGigListingProps(
  gigs: Array<{
    link: string;
    thumbnail: string;
    title: string;
  }>,
) {
  return Promise.all(
    gigs.map(async gig => {
      await cms.copyAssetToPublicFolder(gig.thumbnail);
      return Object.assign(gig, {
        thumbnail: `/portfolio/${gig.thumbnail}`,
      });
    }),
  );
}

export default function GigListingSection({
  gigs,
}: {
  gigs: Array<{
    link: string;
    thumbnail: string;
    title: string;
  }>;
}) {
  return (
    <Grid
      component={'ul'}
      container
      spacing={2}
      sx={{
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
      }}
    >
      {gigs.map(gig => {
        return (
          <Grid component={'li'} key={gig.title} size={{ md: 6, xs: 12 }}>
            <Paper
              component={'a'}
              href={gig.link}
              rel={'noopener noreferer'}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                justifyContent: 'center',
                paddingX: 2,
                paddingY: 1,
                textDecorationLine: 'none',
              }}
              target={'_blank'}
            >
              <Box
                autoPlay
                component={'video'}
                loop
                src={gig.thumbnail}
                sx={{
                  height: 180,
                  objectFit: 'cover',
                  width: 320,
                }}
              />
              <Typography component={'h1'} variant={'h5'}>
                {gig.title}
              </Typography>
              <Button variant="contained">Discover My Work on Fiverr</Button>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
