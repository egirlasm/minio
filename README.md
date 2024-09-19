# minio
mino for actions

# Usage

```
      - name: Minio Deploy
        uses: egirlasm/minio@v1.0.0-beta0919
        with:
          endpoint: '192.168.219.100'
          bucket: 'some-project'
          use-ssl: false
          paths: |-
            build/app/outputs/flutter-apk/app-release.apk
        env:
          MINIO_ACCESS_KEY: ${{ secrets.ACCESS_KEY }}
          MINIO_ACCESS_SECRET: ${{ secrets.ACCESS_SECRET }}
```
