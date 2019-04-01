FROM alpine:latest

COPY duckHunt /duckHunt

ENTRYPOINT [ "/duckHunt" ]