FROM appjumpstart/station:v1.0.0

COPY site/dist .

CMD ["./station"]
